-- Verification query: Check if drafts table and project_id column exist
SELECT
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'drafts'
AND column_name = 'project_id';

-- Also check if the drafts table exists at all
SELECT tablename FROM pg_tables WHERE tablename = 'drafts';

-- Check all tables created by the migration
SELECT tablename FROM pg_tables
WHERE tablename IN ('projects', 'drafts', 'draft_outputs', 'user_settings');