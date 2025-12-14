-- COMPLETE TEST: Create tables AND verify they work
-- Copy and paste THIS ENTIRE BLOCK into Supabase SQL Editor

-- Step 1: Create the tables
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL DEFAULT 'Test Project',
  input_type text NOT NULL CHECK (input_type IN ('text')),
  intent text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  version_number integer NOT NULL,
  title text NOT NULL DEFAULT 'Draft',
  content text,
  status text NOT NULL DEFAULT 'generating',
  created_at timestamptz DEFAULT now()
);

-- Step 2: IMMEDIATELY verify the project_id column was created
SELECT
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'drafts'
AND column_name = 'project_id';

-- Step 3: Test that we can insert data using project_id
INSERT INTO projects (user_id, title, input_type, intent)
VALUES ('test-user-123', 'Test Project', 'text', 'deck')
RETURNING id;

-- The verification should return: drafts | project_id | uuid | NO