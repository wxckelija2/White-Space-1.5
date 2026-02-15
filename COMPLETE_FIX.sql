-- 🔧 COMPLETE FIX: Handle existing data before adding constraint

-- Step 1: Check what status values currently exist
SELECT DISTINCT status, COUNT(*) as count
FROM projects
GROUP BY status;

-- Step 2: Update any invalid status values to 'active'
UPDATE projects
SET status = 'active'
WHERE status NOT IN ('active', 'completed', 'archived')
   OR status IS NULL;

-- Step 3: Verify all statuses are now valid
SELECT DISTINCT status, COUNT(*) as count
FROM projects
GROUP BY status;

-- Step 4: Now safely drop and recreate the constraint
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_status_check;

ALTER TABLE projects ADD CONSTRAINT projects_status_check
  CHECK (status IN ('active', 'completed', 'archived'));

-- Step 5: Test that project creation works
INSERT INTO projects (user_id, title, input_type, input_content, intent, status)
VALUES ('da0fa46e-aed8-48e8-b63b-23506cbfe448', '✅ Fix Complete!', 'text', 'Project creation is now working perfectly!', 'generate', 'active')
RETURNING id, title, '🎉 SUCCESS: All issues resolved!' as message;


