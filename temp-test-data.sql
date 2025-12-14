-- Test: Create a sample project first
INSERT INTO projects (user_id, title, input_type, intent, status)
VALUES ('test-user-id', 'Test Project', 'text', 'deck', 'active')
RETURNING id;

-- Test: Create a draft for that project (replace 'PROJECT_ID_HERE' with the ID from above)
-- INSERT INTO drafts (project_id, version_number, title, content, status)
-- VALUES ('PROJECT_ID_HERE', 1, 'Test Draft', 'Test content', 'completed');