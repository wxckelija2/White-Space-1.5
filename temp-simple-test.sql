-- Simple test to verify basic table creation works
-- Run this FIRST to make sure your Supabase connection works

-- Drop tables if they exist (CAUTION: This will delete data!)
-- DROP TABLE IF EXISTS draft_outputs;
-- DROP TABLE IF EXISTS drafts;
-- DROP TABLE IF EXISTS projects;
-- DROP TABLE IF EXISTS user_settings;

-- Create minimal tables to test
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

-- Verify tables were created
SELECT
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name IN ('projects', 'drafts')
AND column_name = 'project_id'
ORDER BY table_name, column_name;