-- Test inserting directly to see if the constraint issue is with the data or the app
INSERT INTO projects (
  user_id,
  title,
  input_type,
  input_content,
  intent,
  status
) VALUES (
  'da0fa46e-aed8-48e8-b63b-23506cbfe448',  -- Your actual user ID from logs
  'Direct SQL Test',
  'text',
  'Test content',
  'generate',
  'active'
) RETURNING id, title, status;

-- If this works, the issue is in the app code
-- If this fails with same error, the issue is database constraint