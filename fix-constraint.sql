-- Fix the projects status constraint issue
-- This should resolve the "Failed to create project" error

-- First, check current constraints
SELECT
    conname,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conname LIKE '%projects%'
AND contype = 'c';

-- Drop the problematic constraint if it exists
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_status_check;

-- Create the correct constraint that allows 'active', 'completed', 'archived'
ALTER TABLE projects ADD CONSTRAINT projects_status_check
  CHECK (status IN ('active', 'completed', 'archived'));

-- Verify the constraint was created correctly
SELECT
    conname,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conname = 'projects_status_check';

-- Test creating a project directly
INSERT INTO projects (
  user_id,
  title,
  input_type,
  input_content,
  intent,
  status
) VALUES (
  'da0fa46e-aed8-48e8-b63b-23506cbfe448',
  'Test Project - Constraint Fix',
  'text',
  'Testing the constraint fix',
  'generate',
  'active'
) RETURNING id, title, status;