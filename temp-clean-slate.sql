-- If you have partially created tables, clean them up first
-- WARNING: This will delete ALL data in these tables!

-- Drop tables in correct order (reverse of creation)
DROP TABLE IF EXISTS draft_outputs CASCADE;
DROP TABLE IF EXISTS drafts CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS user_settings CASCADE;

-- Now run your full migration
-- (Copy and paste the entire migration file after running this)