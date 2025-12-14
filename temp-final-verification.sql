-- FINAL VERIFICATION: After running the complete migration
-- Run this to confirm everything worked

-- Check if ALL tables exist
SELECT tablename FROM pg_tables
WHERE tablename IN ('projects', 'drafts', 'draft_outputs', 'user_settings')
ORDER BY tablename;

-- Check if project_id column exists in drafts table
SELECT
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'drafts'
AND column_name = 'project_id';

-- Test creating sample data
INSERT INTO projects (user_id, title, input_type, intent)
VALUES ('test-user-id', 'Sample Project', 'text', 'deck')
RETURNING id;

-- If all of these work, your database is ready!