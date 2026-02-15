-- 🚀 COMPREHENSIVE DRAFTS TABLE FIX
-- This addresses both schema issues and RLS policy problems

-- Step 1: Check current table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'drafts'
ORDER BY ordinal_position;

-- Step 2: Drop existing RLS policies that might be problematic
DROP POLICY IF EXISTS "Users can view drafts of own projects" ON drafts;
DROP POLICY IF EXISTS "Users can insert drafts for own projects" ON drafts;
DROP POLICY IF EXISTS "Users can update drafts of own projects" ON drafts;
DROP POLICY IF EXISTS "Users can delete drafts of own projects" ON drafts;

-- Step 3: Disable RLS temporarily to allow schema changes
ALTER TABLE drafts DISABLE ROW LEVEL SECURITY;

-- Step 4: Add missing columns safely
DO $$
BEGIN
    -- Add project_id if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'drafts' AND column_name = 'project_id') THEN
        ALTER TABLE drafts ADD COLUMN project_id uuid REFERENCES projects(id) ON DELETE CASCADE;
        -- Set default project_id for existing rows
        UPDATE drafts SET project_id = 'd9910c29-e6c5-4cd8-afb5-32cd3a8dcc24' WHERE project_id IS NULL;
        ALTER TABLE drafts ALTER COLUMN project_id SET NOT NULL;
    END IF;

    -- Add other missing columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'drafts' AND column_name = 'parent_draft_id') THEN
        ALTER TABLE drafts ADD COLUMN parent_draft_id uuid REFERENCES drafts(id) ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'drafts' AND column_name = 'version_number') THEN
        ALTER TABLE drafts ADD COLUMN version_number integer NOT NULL DEFAULT 1;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'drafts' AND column_name = 'title') THEN
        ALTER TABLE drafts ADD COLUMN title text NOT NULL DEFAULT 'Draft';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'drafts' AND column_name = 'content') THEN
        ALTER TABLE drafts ADD COLUMN content text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'drafts' AND column_name = 'locked_at') THEN
        ALTER TABLE drafts ADD COLUMN locked_at timestamptz;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'drafts' AND column_name = 'metadata') THEN
        ALTER TABLE drafts ADD COLUMN metadata jsonb DEFAULT '{}';
    END IF;
END $$;

-- Step 5: Add constraints safely
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'drafts_status_check') THEN
        ALTER TABLE drafts ADD CONSTRAINT drafts_status_check
          CHECK (status IN ('generating', 'completed', 'failed', 'locked'));
    END IF;
END $$;

-- Step 6: Re-enable RLS
ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;

-- Step 7: Recreate RLS policies
CREATE POLICY "Users can view drafts of own projects"
  ON drafts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = drafts.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert drafts for own projects"
  ON drafts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = drafts.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update drafts of own projects"
  ON drafts
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = drafts.project_id
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = drafts.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete drafts of own projects"
  ON drafts
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = drafts.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Step 8: Verify final schema
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'drafts'
ORDER BY ordinal_position;

-- Step 9: Test the fix (this should work now with proper RLS)
-- Note: This test insert will only work if run with proper authentication
-- In your app, this works because it uses the user's JWT token

SELECT '✅ Drafts table schema fixed successfully!' as status;