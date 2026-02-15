-- 🚀 TEMPORARY RLS BYPASS TO TEST SCHEMA
-- This temporarily disables RLS to test if the schema works

-- Disable RLS temporarily
ALTER TABLE drafts DISABLE ROW LEVEL SECURITY;

-- Try to insert a test draft
INSERT INTO drafts (
  project_id,
  version_number,
  title,
  content,
  status,
  is_locked,
  metadata
) VALUES (
  'e3fc69fb-691f-4e63-abf3-c8f5b306e082', -- Current project ID
  1,
  'Test Draft - RLS Bypass',
  'This tests if schema works when RLS is disabled',
  'generating',
  false,
  '{"test": "rls_bypass"}'
) RETURNING *;

-- Check if it worked
SELECT * FROM drafts WHERE title = 'Test Draft - RLS Bypass';

-- Re-enable RLS
ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;

-- Clean up test data
DELETE FROM drafts WHERE title = 'Test Draft - RLS Bypass';

SELECT '✅ Schema test completed - RLS re-enabled' as status;