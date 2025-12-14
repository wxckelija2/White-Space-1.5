/*
  # White Space Database Schema

  Creates the core tables for White Space app functionality.

  ## New Tables

  ### `projects`
  Stores user projects (containers for draft workflows)
  - `id` (uuid, primary key) - Unique project identifier
  - `user_id` (uuid) - Owner of the project
  - `title` (text) - Project title (auto-generated or user-provided)
  - `input_type` (text) - Type of input: text, image, video, audio
  - `input_content` (text) - Text input or reference URL to media
  - `input_url` (text) - URL to uploaded media file
  - `intent` (text) - What user wants to generate (deck, mockup, social, etc.)
  - `tags` (text[]) - Tags for categorization and search
  - `status` (text) - active, completed, archived
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `drafts`
  Stores individual draft versions within a project
  - `id` (uuid, primary key) - Unique draft identifier
  - `project_id` (uuid, foreign key) - Reference to parent project
  - `parent_draft_id` (uuid) - Reference to parent draft (for branching)
  - `version_number` (integer) - Sequential version number within project
  - `title` (text) - Draft title (auto-generated)
  - `content` (text) - The draft content/text
  - `status` (text) - generating, completed, failed, locked
  - `is_locked` (boolean) - Whether this draft is final/locked
  - `locked_at` (timestamptz) - When draft was locked
  - `metadata` (jsonb) - Additional draft metadata (prompt, settings, etc.)
  - `created_at` (timestamptz) - Creation timestamp

  ### `draft_outputs`
  Stores generated outputs/assets for each draft
  - `id` (uuid, primary key) - Unique output identifier
  - `draft_id` (uuid, foreign key) - Reference to parent draft
  - `output_type` (text) - Type: deck, image, video, summary, mockup, copy
  - `output_url` (text) - URL to generated asset
  - `output_data` (jsonb) - Additional metadata (caption, dimensions, etc.)
  - `status` (text) - generating, completed, failed
  - `created_at` (timestamptz) - Generation timestamp

  ### `user_settings`
  Stores user preferences and integration settings
  - `user_id` (uuid, primary key) - User identifier
  - `connected_integrations` (jsonb) - Connected services (Drive, etc.)
  - `preferences` (jsonb) - User preferences (language, defaults, etc.)
  - `memory_enabled` (boolean) - Whether to store patterns for predictions
  - `local_mode` (boolean) - Privacy mode (local processing only)
  - `subscription_tier` (text) - free, pro, enterprise
  - `created_at` (timestamptz) - Account creation
  - `updated_at` (timestamptz) - Last settings update

  ## Security

  Enable RLS on all tables with policies for:
  - Users can only access their own projects, drafts, and outputs
  - Users can only read/write their own settings
*/

-- Create projects table
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

-- Create drafts table
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

-- Create draft_outputs table
CREATE TABLE IF NOT EXISTS draft_outputs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id uuid NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,
  output_type text NOT NULL CHECK (output_type IN ('deck', 'image', 'video', 'summary', 'mockup', 'copy')),
  output_url text,
  output_data jsonb DEFAULT '{}',
  status text NOT NULL DEFAULT 'generating' CHECK (status IN ('generating', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  user_id uuid PRIMARY KEY,
  connected_integrations jsonb DEFAULT '{}',
  preferences jsonb DEFAULT '{}',
  memory_enabled boolean DEFAULT true,
  local_mode boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_drafts_project_id ON drafts(project_id);
CREATE INDEX IF NOT EXISTS idx_drafts_parent_draft_id ON drafts(parent_draft_id);
CREATE INDEX IF NOT EXISTS idx_drafts_created_at ON drafts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_drafts_status ON drafts(status);
CREATE INDEX IF NOT EXISTS idx_draft_outputs_draft_id ON draft_outputs(draft_id);
CREATE INDEX IF NOT EXISTS idx_draft_outputs_created_at ON draft_outputs(created_at DESC);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE draft_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects table
CREATE POLICY "Users can view own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for drafts table
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

-- RLS Policies for draft_outputs table
CREATE POLICY "Users can view draft_outputs of own drafts"
  ON draft_outputs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM drafts
      JOIN projects ON projects.id = drafts.project_id
      WHERE drafts.id = draft_outputs.draft_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert draft_outputs for own drafts"
  ON draft_outputs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM drafts
      JOIN projects ON projects.id = drafts.project_id
      WHERE drafts.id = draft_outputs.draft_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update draft_outputs of own drafts"
  ON draft_outputs
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM drafts
      JOIN projects ON projects.id = drafts.project_id
      WHERE drafts.id = draft_outputs.draft_id
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM drafts
      JOIN projects ON projects.id = drafts.project_id
      WHERE drafts.id = draft_outputs.draft_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete draft_outputs of own drafts"
  ON draft_outputs
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM drafts
      JOIN projects ON projects.id = drafts.project_id
      WHERE drafts.id = draft_outputs.draft_id
      AND projects.user_id = auth.uid()
    )
  );

-- RLS Policies for user_settings table
CREATE POLICY "Users can view own settings"
  ON user_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON user_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON user_settings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own settings"
  ON user_settings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);