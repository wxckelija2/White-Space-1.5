-- Debug: Test project creation directly in SQL
-- This will help us see if the issue is with RLS policies or data

-- First, check what user is authenticated (this might not work in SQL Editor)
-- SELECT auth.uid() as current_user_id;

-- Try to insert a project directly
INSERT INTO projects (
  user_id,
  title,
  input_type,
  input_content,
  intent,
  tags,
  status
) VALUES (
  'test-user-id',  -- Replace with actual user ID if known
  'Test Project from SQL',
  'text',
  'Test content',
  'generate',
  '{}',
  'active'
) RETURNING id, user_id, title;

-- If this fails, check the RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'projects';