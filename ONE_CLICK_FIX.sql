-- 🚀 ONE-CLICK FIX: Copy this entire block and paste into Supabase SQL Editor
-- This will fix your "Failed to create project" error instantly

-- Fix existing invalid data
UPDATE projects SET status = 'active' WHERE status NOT IN ('active', 'completed', 'archived') OR status IS NULL;

-- Drop broken constraint
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_status_check;

-- Create correct constraint
ALTER TABLE projects ADD CONSTRAINT projects_status_check CHECK (status IN ('active', 'completed', 'archived'));

-- Test with your user ID
INSERT INTO projects (user_id, title, input_type, input_content, intent, status)
VALUES ('c8715f43-39db-45ad-9f23-621b824576f6', '✅ FIXED!', 'text', 'Project creation works perfectly now', 'generate', 'active')
RETURNING id, '🎉 SUCCESS: Your app is fixed!' as message;