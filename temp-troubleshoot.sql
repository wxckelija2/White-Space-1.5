-- If migration still fails, try creating tables one by one:

-- Step 1: Create projects table only
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL DEFAULT 'Untitled Project',
  input_type text NOT NULL CHECK (input_type IN ('text', 'image', 'video', 'audio')),
  input_content text,
  input_url text,
  intent text NOT NULL,
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 2: Create drafts table only
CREATE TABLE IF NOT EXISTS drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  parent_draft_id uuid REFERENCES drafts(id) ON DELETE SET NULL,
  version_number integer NOT NULL,
  title text NOT NULL DEFAULT 'Draft',
  content text,
  status text NOT NULL DEFAULT 'generating' CHECK (status IN ('generating', 'completed', 'failed', 'locked')),
  is_locked boolean DEFAULT false,
  locked_at timestamptz,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Step 3: Verify both tables exist
SELECT tablename FROM pg_tables WHERE tablename IN ('projects', 'drafts');