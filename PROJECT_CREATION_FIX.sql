-- 🚀 COMPREHENSIVE FIX for "Failed to create project" Error
-- Run this entire file in your Supabase SQL Editor

-- Step 1: Check what invalid status values exist in your current projects
SELECT DISTINCT status, COUNT(*) as count
FROM projects
GROUP BY status
ORDER BY count DESC;

-- Step 2: Check what invalid input_type values exist
SELECT DISTINCT input_type, COUNT(*) as count
FROM projects
WHERE input_type NOT IN ('text', 'image', 'video', 'audio') OR input_type IS NULL
GROUP BY input_type;

-- Step 3: Drop the problematic constraints FIRST
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_status_check;
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_input_type_check;

-- Step 4: Fix all invalid status values BEFORE adding constraints
UPDATE projects
SET status = CASE
  WHEN status = 'generate' THEN 'active'
  WHEN status = 'generating' THEN 'active'
  WHEN status NOT IN ('active', 'completed', 'archived') OR status IS NULL THEN 'active'
  ELSE status
END;

-- Step 5: Fix all invalid input_type values
UPDATE projects
SET input_type = CASE
  WHEN input_type NOT IN ('text', 'image', 'video', 'audio') OR input_type IS NULL THEN 'text'
  ELSE input_type
END;

-- Step 6: Verify all data is now valid
SELECT DISTINCT status, COUNT(*) as count
FROM projects
GROUP BY status;

-- Step 7: Add the correct constraints
ALTER TABLE projects ADD CONSTRAINT projects_status_check
  CHECK (status IN ('active', 'completed', 'archived'));

ALTER TABLE projects ADD CONSTRAINT projects_input_type_check
  CHECK (input_type IN ('text', 'image', 'video', 'audio'));

-- Step 8: Verify constraints were created successfully
SELECT
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conname IN ('projects_status_check', 'projects_input_type_check');

-- Step 9: Test project creation with a real user ID (replace with your actual user ID)
-- First, let's see what user IDs exist in your projects
SELECT DISTINCT user_id, COUNT(*) as project_count
FROM projects
GROUP BY user_id;

-- Step 10: Test project creation (replace 'your-user-id-here' with a real user ID from above)
INSERT INTO projects (
  user_id,
  title,
  input_type,
  input_content,
  intent,
  tags,
  status
) VALUES (
  'your-user-id-here', -- Replace this with a real user ID from step 9
  '✅ Fix Verification Project',
  'text',
  'This project verifies that the constraint fix works',
  'generate',
  '{}',
  'active'
) RETURNING id, title, status, input_type;

-- Step 11: Clean up test data
DELETE FROM projects WHERE title = '✅ Fix Verification Project';

-- 🎉 If you see successful results above, the fix worked!
-- Your app's "Generate" button should now work perfectly.