-- Test if authentication works in SQL Editor
-- This should show your current user session

SELECT
  auth.uid() as user_id,
  auth.jwt() ->> 'email' as user_email,
  auth.role() as user_role;

-- If this returns NULL, you're not authenticated in the SQL Editor
-- That's normal - SQL Editor auth is separate from app auth

-- But if your app is failing, check if the user_id in your app matches
-- what Supabase expects. The RLS policy requires: auth.uid() = user_id