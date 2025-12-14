-- FORCE TEST: Insert a project directly to bypass app issues
-- This will tell us if the database accepts the data

INSERT INTO projects (
  user_id,
  title,
  input_type,
  input_content,
  intent,
  status
) VALUES (
  'test-user-12345',  -- Replace with your actual user ID from console logs
  'Force Test Project',
  'text',
  'Test content',
  'generate',
  'active'
) RETURNING id, title, user_id;

-- If this works, the issue is in your app code
-- If this fails, the issue is database/RLS