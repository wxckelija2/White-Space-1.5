-- 🚀 FIX FOR "Failed to create project" Error
-- Run this entire file in your Supabase SQL Editor

-- Step 1: Check current constraints (optional - for debugging)
SELECT
    conname,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conname LIKE '%projects%'
AND contype = 'c';

-- Step 2: Drop the problematic constraint
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_status_check;

-- Step 3: Create the correct constraint that allows 'active', 'completed', 'archived'
ALTER TABLE projects ADD CONSTRAINT projects_status_check
  CHECK (status IN ('active', 'completed', 'archived'));

-- Step 4: Verify the constraint was created correctly
SELECT
    conname,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conname = 'projects_status_check';

-- Step 5: Test that project creation works
INSERT INTO projects (
  user_id,
  title,
  input_type,
  input_content,
  intent,
  status
) VALUES (
  'da0fa46e-aed8-48e8-b63b-23506cbfe448',
  '✅ Project Creation Fixed!',
  'text',
  'This project was created to verify the fix works',
  'generate',
  'active'
) RETURNING id, title, status, created_at;

-- 🎉 If you see a successful insert above, the fix worked!
-- Now your app's "Generate" button should work perfectly.


