-- 🚀 Fix Drafts Table Schema
-- Run this in Supabase SQL Editor to fix the missing columns

-- First, check current drafts table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'drafts'
ORDER BY ordinal_position;

-- Add missing columns to drafts table (only add if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'drafts' AND column_name = 'project_id') THEN
        ALTER TABLE drafts ADD COLUMN project_id uuid REFERENCES projects(id) ON DELETE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'drafts' AND column_name = 'parent_draft_id') THEN
        ALTER TABLE drafts ADD COLUMN parent_draft_id uuid REFERENCES drafts(id) ON DELETE SET NULL;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'drafts' AND column_name = 'version_number') THEN
        ALTER TABLE drafts ADD COLUMN version_number integer NOT NULL DEFAULT 1;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'drafts' AND column_name = 'title') THEN
        ALTER TABLE drafts ADD COLUMN title text NOT NULL DEFAULT 'Draft';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'drafts' AND column_name = 'content') THEN
        ALTER TABLE drafts ADD COLUMN content text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'drafts' AND column_name = 'locked_at') THEN
        ALTER TABLE drafts ADD COLUMN locked_at timestamptz;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'drafts' AND column_name = 'metadata') THEN
        ALTER TABLE drafts ADD COLUMN metadata jsonb DEFAULT '{}';
    END IF;
END $$;

-- Update existing rows with default values
UPDATE drafts SET
  project_id = 'd9910c29-e6c5-4cd8-afb5-32cd3a8dcc24', -- Your actual project ID
  version_number = 1,
  title = 'Draft',
  metadata = '{}'
WHERE project_id IS NULL;

-- Make project_id NOT NULL after populating
ALTER TABLE drafts ALTER COLUMN project_id SET NOT NULL;

-- Add constraints that were missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'drafts_status_check') THEN
        ALTER TABLE drafts ADD CONSTRAINT drafts_status_check
          CHECK (status IN ('generating', 'completed', 'failed', 'locked'));
    END IF;
END $$;

-- Update the status default if needed
ALTER TABLE drafts ALTER COLUMN status SET DEFAULT 'generating';

-- Check the final structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'drafts'
ORDER BY ordinal_position;

-- Test creating a draft
INSERT INTO drafts (
  project_id,
  version_number,
  title,
  content,
  status,
  is_locked,
  metadata
) VALUES (
  'd9910c29-e6c5-4cd8-afb5-32cd3a8dcc24', -- Your actual project ID
  1,
  'Test Draft',
  'Test content',
  'generating',
  false,
  '{"test": true}'
) RETURNING *;

-- Clean up test data
DELETE FROM drafts WHERE title = 'Test Draft';